# Brewers Prediction Game - Backend Development Plan

## Overview

This document outlines the backend development requirements for the Brewers Prediction Game application. The backend is built using .NET 8 API with Entity Framework Core for database access. The architecture follows a service pattern where controllers handle HTTP requests and delegate business logic to service classes.

## Database Structure

The database consists of three tables:

```sql
CREATE TABLE NLCentralStandings (
    Id INT PRIMARY KEY NOT NULL,
    Team VARCHAR(100) NOT NULL,
    Wins INT NOT NULL DEFAULT 0,
    Losses INT NOT NULL DEFAULT 0,
    TotalGames INT NOT NULL DEFAULT 162,
    CreatedOn DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedOn DATETIME NOT NULL DEFAULT GETDATE()
);

CREATE TABLE Prediction (
    Id INT PRIMARY KEY NOT NULL,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NULL,
    Wins INT NOT NULL DEFAULT 0,
    CreatedOn DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedOn DATETIME NOT NULL DEFAULT GETDATE()
);

CREATE TABLE Messages (
    Id INT PRIMARY KEY NOT NULL,
    Name VARCHAR(200) NOT NULL,
    Message VARCHAR(MAX) NOT NULL,
    CreatedOn DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedOn DATETIME NOT NULL DEFAULT GETDATE()
);
```

## Project Structure

The backend follows this structure:

```
/ProjectName.API
  /Controllers
    - StandingsController.cs
    - PredictionController.cs
    - MessagesController.cs
  /Models
    /Entities
      - NLCentralStanding.cs
      - Prediction.cs
      - Message.cs
    /Dtos
      - StandingDto.cs
      - PredictionDto.cs
      - MessageDto.cs
      - PredictionRequestDto.cs
      - MessageRequestDto.cs
  /Services
    - IStandingsService.cs
    - StandingsService.cs
    - IPredictionService.cs
    - PredictionService.cs
    - IMessageService.cs
    - MessageService.cs
  - ApplicationDbContext.cs
  - Program.cs
  - appsettings.json
```

## Service Interfaces

### IStandingsService

```csharp
public interface IStandingsService
{
    Task<bool> UpdateStandingsAsync(List<NLCentralStanding> standings);
    Task<List<StandingDto>> GetStandingsAsync();
}
```

### IPredictionService

```csharp
public interface IPredictionService
{
    Task<PredictionDto> AddPredictionAsync(PredictionRequestDto prediction);
    Task<List<PredictionDto>> GetPredictionsAsync(int? id = null, string firstName = null, string lastName = null);
    Task<bool> DeletePredictionAsync(int id);
    Task<PredictionDto> EditPredictionAsync(int id, PredictionRequestDto prediction);
}
```

### IMessageService

```csharp
public interface IMessageService
{
    Task<MessageDto> AddMessageAsync(MessageRequestDto message);
    Task<MessageDto> EditMessageAsync(int id, MessageRequestDto message);
    Task<List<MessageDto>> GetMessagesAsync(int? id = null, string name = null);
}
```

## DTOs (Data Transfer Objects)

### StandingDto

```csharp
public class StandingDto
{
    public int Id { get; set; }
    public string Team { get; set; }
    public int Wins { get; set; }
    public int Losses { get; set; }
    public int TotalGames { get; set; }
    public DateTime UpdatedOn { get; set; }
}
```

### PredictionDto

```csharp
public class PredictionDto
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int Wins { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime UpdatedOn { get; set; }
}
```

### PredictionRequestDto

```csharp
public class PredictionRequestDto
{
    [Required]
    [MaxLength(100)]
    public string FirstName { get; set; }
    
    [MaxLength(100)]
    public string LastName { get; set; }
    
    [Required]
    [Range(0, 162)]
    public int Wins { get; set; }
}
```

### MessageDto

```csharp
public class MessageDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Message { get; set; }
    public bool Responded { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime UpdatedOn { get; set; }
}
```

### MessageRequestDto

```csharp
public class MessageRequestDto
{
    [Required]
    [MaxLength(200)]
    public string Name { get; set; }
    
    [Required]
    public string Message { get; set; }
    
    public bool Responded { get; set; }
}
```

## Entity Classes

### NLCentralStanding

```csharp
public class NLCentralStanding
{
    public int Id { get; set; }
    public string Team { get; set; }
    public int Wins { get; set; }
    public int Losses { get; set; }
    public int TotalGames { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime UpdatedOn { get; set; }
}
```

### Prediction

```csharp
public class Prediction
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int Wins { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime UpdatedOn { get; set; }
}
```

### Message

```csharp
public class Message
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string MessageText { get; set; }
    public bool Responded { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime UpdatedOn { get; set; }
}
```

## Controllers

### StandingsController

```csharp
[ApiController]
[Route("api/[controller]")]
public class StandingsController : ControllerBase
{
    private readonly IStandingsService _standingsService;
    private readonly ILogger<StandingsController> _logger;

    public StandingsController(IStandingsService standingsService, ILogger<StandingsController> logger)
    {
        _standingsService = standingsService;
        _logger = logger;
    }

    [HttpPost("update")]
    public async Task<IActionResult> UpdateStandings([FromBody] List<StandingDto> standings)
    {
        try
        {
            var mappedStandings = standings.Select(s => new NLCentralStanding
            {
                Id = s.Id,
                Team = s.Team,
                Wins = s.Wins,
                Losses = s.Losses,
                TotalGames = s.TotalGames,
                UpdatedOn = DateTime.UtcNow
            }).ToList();

            var result = await _standingsService.UpdateStandingsAsync(mappedStandings);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating standings");
            return StatusCode(500, "An error occurred while updating standings");
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetStandings()
    {
        try
        {
            var standings = await _standingsService.GetStandingsAsync();
            return Ok(standings);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving standings");
            return StatusCode(500, "An error occurred while retrieving standings");
        }
    }
}
```

### PredictionController

```csharp
[ApiController]
[Route("api/[controller]")]
public class PredictionController : ControllerBase
{
    private readonly IPredictionService _predictionService;
    private readonly ILogger<PredictionController> _logger;

    public PredictionController(IPredictionService predictionService, ILogger<PredictionController> logger)
    {
        _predictionService = predictionService;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> AddPrediction([FromBody] PredictionRequestDto predictionRequest)
    {
        try
        {
            var prediction = await _predictionService.AddPredictionAsync(predictionRequest);
            return CreatedAtAction(nameof(GetPrediction), new { id = prediction.Id }, prediction);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding prediction");
            return StatusCode(500, "An error occurred while adding prediction");
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetPredictions([FromQuery] int? id = null, [FromQuery] string firstName = null, [FromQuery] string lastName = null)
    {
        try
        {
            var predictions = await _predictionService.GetPredictionsAsync(id, firstName, lastName);
            return Ok(predictions);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving predictions");
            return StatusCode(500, "An error occurred while retrieving predictions");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPrediction(int id)
    {
        try
        {
            var predictions = await _predictionService.GetPredictionsAsync(id);
            var prediction = predictions.FirstOrDefault();
            
            if (prediction == null)
                return NotFound();
                
            return Ok(prediction);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error retrieving prediction with ID {id}");
            return StatusCode(500, "An error occurred while retrieving prediction");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePrediction(int id)
    {
        try
        {
            var result = await _predictionService.DeletePredictionAsync(id);
            
            if (!result)
                return NotFound();
                
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error deleting prediction with ID {id}");
            return StatusCode(500, "An error occurred while deleting prediction");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditPrediction(int id, [FromBody] PredictionRequestDto predictionRequest)
    {
        try
        {
            var prediction = await _predictionService.EditPredictionAsync(id, predictionRequest);
            
            if (prediction == null)
                return NotFound();
                
            return Ok(prediction);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error editing prediction with ID {id}");
            return StatusCode(500, "An error occurred while editing prediction");
        }
    }
}
```

### MessagesController

```csharp
[ApiController]
[Route("api/[controller]")]
public class MessagesController : ControllerBase
{
    private readonly IMessageService _messageService;
    private readonly ILogger<MessagesController> _logger;

    public MessagesController(IMessageService messageService, ILogger<MessagesController> logger)
    {
        _messageService = messageService;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> AddMessage([FromBody] MessageRequestDto messageRequest)
    {
        try
        {
            var message = await _messageService.AddMessageAsync(messageRequest);
            return CreatedAtAction(nameof(GetMessage), new { id = message.Id }, message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding message");
            return StatusCode(500, "An error occurred while adding message");
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetMessages([FromQuery] int? id = null, [FromQuery] string name = null)
    {
        try
        {
            var messages = await _messageService.GetMessagesAsync(id, name);
            return Ok(messages);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving messages");
            return StatusCode(500, "An error occurred while retrieving messages");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetMessage(int id)
    {
        try
        {
            var messages = await _messageService.GetMessagesAsync(id);
            var message = messages.FirstOrDefault();
            
            if (message == null)
                return NotFound();
                
            return Ok(message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error retrieving message with ID {id}");
            return StatusCode(500, "An error occurred while retrieving message");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditMessage(int id, [FromBody] MessageRequestDto messageRequest)
    {
        try
        {
            var message = await _messageService.EditMessageAsync(id, messageRequest);
            
            if (message == null)
                return NotFound();
                
            return Ok(message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error editing message with ID {id}");
            return StatusCode(500, "An error occurred while editing message");
        }
    }
}
```

## Service Implementations

### StandingsService

```csharp
public class StandingsService : IStandingsService
{
    private readonly ApplicationDbContext _context;

    public StandingsService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> UpdateStandingsAsync(List<NLCentralStanding> standings)
    {
        try
        {
            // Get existing standings
            var existingStandings = await _context.NLCentralStandings.ToListAsync();
            
            foreach (var standing in standings)
            {
                var existingStanding = existingStandings.FirstOrDefault(s => s.Id == standing.Id);
                
                if (existingStanding != null)
                {
                    // Update existing
                    existingStanding.Team = standing.Team;
                    existingStanding.Wins = standing.Wins;
                    existingStanding.Losses = standing.Losses;
                    existingStanding.TotalGames = standing.TotalGames;
                    existingStanding.UpdatedOn = DateTime.UtcNow;
                }
                else
                {
                    // Add new
                    standing.CreatedOn = DateTime.UtcNow;
                    standing.UpdatedOn = DateTime.UtcNow;
                    _context.NLCentralStandings.Add(standing);
                }
            }
            
            await _context.SaveChangesAsync();
            return true;
        }
        catch
        {
            throw;
        }
    }

    public async Task<List<StandingDto>> GetStandingsAsync()
    {
        try
        {
            var standings = await _context.NLCentralStandings
                .OrderByDescending(s => s.Wins)
                .ThenBy(s => s.Losses)
                .ToListAsync();
                
            return standings.Select(s => new StandingDto
            {
                Id = s.Id,
                Team = s.Team,
                Wins = s.Wins,
                Losses = s.Losses,
                TotalGames = s.TotalGames,
                UpdatedOn = s.UpdatedOn
            }).ToList();
        }
        catch
        {
            throw;
        }
    }
}
```

### PredictionService

```csharp
public class PredictionService : IPredictionService
{
    private readonly ApplicationDbContext _context;

    public PredictionService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PredictionDto> AddPredictionAsync(PredictionRequestDto predictionRequest)
    {
        try
        {
            var prediction = new Prediction
            {
                FirstName = predictionRequest.FirstName,
                LastName = predictionRequest.LastName ?? string.Empty,
                Wins = predictionRequest.Wins,
                CreatedOn = DateTime.UtcNow,
                UpdatedOn = DateTime.UtcNow
            };
            
            _context.Predictions.Add(prediction);
            await _context.SaveChangesAsync();
            
            return new PredictionDto
            {
                Id = prediction.Id,
                FirstName = prediction.FirstName,
                LastName = prediction.LastName,
                Wins = prediction.Wins,
                CreatedOn = prediction.CreatedOn,
                UpdatedOn = prediction.UpdatedOn
            };
        }
        catch
        {
            throw;
        }
    }

    public async Task<List<PredictionDto>> GetPredictionsAsync(int? id = null, string firstName = null, string lastName = null)
    {
        try
        {
            IQueryable<Prediction> query = _context.Predictions;
            
            if (id.HasValue)
                query = query.Where(p => p.Id == id.Value);
                
            if (!string.IsNullOrEmpty(firstName))
                query = query.Where(p => p.FirstName.Contains(firstName));
                
            if (!string.IsNullOrEmpty(lastName))
                query = query.Where(p => p.LastName.Contains(lastName));
                
            var predictions = await query.ToListAsync();
            
            return predictions.Select(p => new PredictionDto
            {
                Id = p.Id,
                FirstName = p.FirstName,
                LastName = p.LastName,
                Wins = p.Wins,
                CreatedOn = p.CreatedOn,
                UpdatedOn = p.UpdatedOn
            }).ToList();
        }
        catch
        {
            throw;
        }
    }

    public async Task<bool> DeletePredictionAsync(int id)
    {
        try
        {
            var prediction = await _context.Predictions.FindAsync(id);
            
            if (prediction == null)
                return false;
                
            _context.Predictions.Remove(prediction);
            await _context.SaveChangesAsync();
            
            return true;
        }
        catch
        {
            throw;
        }
    }

    public async Task<PredictionDto> EditPredictionAsync(int id, PredictionRequestDto predictionRequest)
    {
        try
        {
            var prediction = await _context.Predictions.FindAsync(id);
            
            if (prediction == null)
                return null;
                
            prediction.FirstName = predictionRequest.FirstName;
            prediction.LastName = predictionRequest.LastName ?? string.Empty;
            prediction.Wins = predictionRequest.Wins;
            prediction.UpdatedOn = DateTime.UtcNow;
            
            await _context.SaveChangesAsync();
            
            return new PredictionDto
            {
                Id = prediction.Id,
                FirstName = prediction.FirstName,
                LastName = prediction.LastName,
                Wins = prediction.Wins,
                CreatedOn = prediction.CreatedOn,
                UpdatedOn = prediction.UpdatedOn
            };
        }
        catch
        {
            throw;
        }
    }
}
```

### MessageService

```csharp
public class MessageService : IMessageService
{
    private readonly ApplicationDbContext _context;

    public MessageService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<MessageDto> AddMessageAsync(MessageRequestDto messageRequest)
    {
        try
        {
            var message = new Message
            {
                Name = messageRequest.Name,
                MessageText = messageRequest.Message,
                Responded = messageRequest.Responded,
                CreatedOn = DateTime.UtcNow,
                UpdatedOn = DateTime.UtcNow
            };
            
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            
            return new MessageDto
            {
                Id = message.Id,
                Name = message.Name,
                Message = message.MessageText,
                Responded = message.Responded,
                CreatedOn = message.CreatedOn,
                UpdatedOn = message.UpdatedOn
            };
        }
        catch
        {
            throw;
        }
    }

    public async Task<MessageDto> EditMessageAsync(int id, MessageRequestDto messageRequest)
    {
        try
        {
            var message = await _context.Messages.FindAsync(id);
            
            if (message == null)
                return null;
                
            message.Name = messageRequest.Name;
            message.MessageText = messageRequest.Message;
            message.Responded = messageRequest.Responded;
            message.UpdatedOn = DateTime.UtcNow;
            
            await _context.SaveChangesAsync();
            
            return new MessageDto
            {
                Id = message.Id,
                Name = message.Name,
                Message = message.MessageText,
                Responded = message.Responded,
                CreatedOn = message.CreatedOn,
                UpdatedOn = message.UpdatedOn
            };
        }
        catch
        {
            throw;
        }
    }

    public async Task<List<MessageDto>> GetMessagesAsync(int? id = null, string name = null)
    {
        try
        {
            IQueryable<Message> query = _context.Messages;
            
            if (id.HasValue)
                query = query.Where(m => m.Id == id.Value);
                
            if (!string.IsNullOrEmpty(name))
                query = query.Where(m => m.Name.Contains(name));
                
            var messages = await query.ToListAsync();
            
            return messages.Select(m => new MessageDto
            {
                Id = m.Id,
                Name = m.Name,
                Message = m.MessageText,
                Responded = m.Responded,
                CreatedOn = m.CreatedOn,
                UpdatedOn = m.UpdatedOn
            }).ToList();
        }
        catch
        {
            throw;
        }
    }
}
```

## ApplicationDbContext

```csharp
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<NLCentralStanding> NLCentralStandings { get; set; }
    public DbSet<Prediction> Predictions { get; set; }
    public DbSet<Message> Messages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure NLCentralStanding entity
        modelBuilder.Entity<NLCentralStanding>()
            .ToTable("NLCentralStandings");

        // Configure Prediction entity
        modelBuilder.Entity<Prediction>()
            .ToTable("Prediction");

        // Configure Message entity
        modelBuilder.Entity<Message>()
            .ToTable("Messages");
        
        modelBuilder.Entity<Message>()
            .Property(m => m.MessageText)
            .HasColumnName("Message");
            
        // Add Responded column if not in the original schema
        modelBuilder.Entity<Message>()
            .Property(m => m.Responded)
            .HasDefaultValue(false);
    }
}
```

## Dependency Injection in Program.cs

```csharp
// Add services to the container
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register services
builder.Services.AddScoped<IStandingsService, StandingsService>();
builder.Services.AddScoped<IPredictionService, PredictionService>();
builder.Services.AddScoped<IMessageService, MessageService>();

// Add controllers
builder.Services.AddControllers();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder
            .WithOrigins("http://localhost:3000") // Add your frontend URL
            .AllowAnyMethod()
            .AllowAnyHeader());
});
```

## Testing Plan

1. Unit test each service method to ensure proper data handling
2. Integration test each controller endpoint
3. Test filtering functionality in GetPredictions and GetMessages methods
4. Verify error handling works correctly

## Deployment Notes

1. Configure connection string in Azure App Service configuration
2. Set up CORS to allow only the frontend application origin
3. Consider implementing Identity for more robust admin authentication in the future
4. Set up proper logging with Application Insights
