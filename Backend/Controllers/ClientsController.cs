using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using EmployeeWebAPI.Data;
using EmployeeWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeWebAPI.Controllers
{
        [Route("api/[controller]")]
        [ApiController]
        public class ClientsController : ControllerBase
        {
            private readonly EmployeeDbContext _context;

            public ClientsController(EmployeeDbContext context)
            {
                _context = context;
            }


            // GET: api/Clients
            [HttpGet]
            public async Task<ActionResult<IEnumerable<Client>>> GetClients()
            {
                return await _context.Clients.ToListAsync();
            }
            [HttpGet("{id}")]


            // GET: api/Clients/5
            public async Task<ActionResult<Client>> GetClients(int id)
            {
                var client = await _context.Clients.FindAsync(id);

                if (client == null)
                {
                    return NotFound();
                }

                return client;
            }

            // PUT: api/Clients/5
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
            [HttpPut("{id}")]
            public async Task<IActionResult> PutClients(int id, Client clients)
            {
                if (id != clients.Id)
                {
                    return BadRequest();
                }

                _context.Entry(clients).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ClientsExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return NoContent();
            }

            // POST: api/Clients
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
            [HttpPost]
            public async Task<ActionResult<Client>> PostClients(Client clients)

            {

                _context.Clients.Add(clients);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetClients", new { id = clients.Id }, clients);
            }
        [HttpGet("ByEmployee/{employeeId}")]
        public async Task<ActionResult<IEnumerable<Client>>> GetCollectionsByEmployee(int employeeId)
        {
            var collections = await _context.Clients
                .Where(c => c.EmployeeId == employeeId)
                .ToListAsync();

            if (collections == null || collections.Count == 0)
            {
                return NotFound("Employee Not Found");
            }

            return collections;
        }

        // DELETE: api/Clients/5
        [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteClients(int id)
            {
                var clients = await _context.Clients.FindAsync(id);
                if (clients == null)
                {
                    return NotFound();
                }

                _context.Clients.Remove(clients);
                await _context.SaveChangesAsync();

                return NoContent();
            }

            private bool ClientsExists(int id)
            {
                return _context.Clients.Any(e => e.Id == id);
            }
        }
}
