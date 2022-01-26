using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.API.Data;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        private readonly DataContext _context;

        public EventoController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Evento> GetEventos()
        {
            return _context.Eventos;
        }

        [HttpGet("{id}")]
        public Evento GetEventosById(int id)
        {
            return _context.Eventos.FirstOrDefault(x => x.Id == id);
        }   

        [HttpPost]
        public string Post()
        {
            return "Value";
        }

        [HttpPut("{id}")]
        public string Put(int id)
        {
            return "Value";
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return "Value";
        }
    }
}