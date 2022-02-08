using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.Persistence.Data;
using ProEventos.Domain.Models;
using ProEventos.Application.Interface;
using Microsoft.AspNetCore.Http;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        private readonly IEventoService _eventoService;

        public EventoController(IEventoService eventoService)
        {
            _eventoService = eventoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetEventos()
        {
           try
           {
               var eventos = await _eventoService.GetAllEventosAsync(true);

               if (eventos == null) return NotFound("Nenhum evento encontrado.");

               return Ok(eventos);
           }
           catch (Exception ex)
           {
               return this.StatusCode(StatusCodes.Status500InternalServerError,
                                      $"Erro ao tentar recuperar eventos. Error: {ex.Message}");
           }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventosById(int id)
        {
           try
           {
               var eventos = await _eventoService.GetEventoByIdAsync(id, true);

               if (eventos == null) return NotFound("Evento por Id não encontrado.");

               return Ok(eventos);
           }
           catch (Exception ex)
           {
               return this.StatusCode(StatusCodes.Status500InternalServerError,
                                      $"Erro ao tentar recuperar eventos. Error: {ex.Message}");
           }
        }   

        [HttpGet("{tema}/tema")]
        public async Task<IActionResult> GetEventosByTema(string tema)
        {
           try
           {
               var eventos = await _eventoService.GetAllEventosByTemaAsync(tema, true);

               if (eventos == null) return NotFound("Eventos por tema não encontrado.");

               return Ok(eventos);
           }
           catch (Exception ex)
           {
               return this.StatusCode(StatusCodes.Status500InternalServerError,
                                      $"Erro ao tentar recuperar eventos. Error: {ex.Message}");
           }
        }           

        [HttpPost]
        public async Task<IActionResult> Post(Evento model)
        {
           try
           {
               var eventos = await _eventoService.AddEventos(model);

               if (eventos == null) return BadRequest("Erro ao tentar adicionar evento.");

               return Ok(eventos);
           }
           catch (Exception ex)
           {
               return this.StatusCode(StatusCodes.Status500InternalServerError,
                                      $"Erro ao tentar adicionar eventos. Error: {ex.Message}");
           }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Evento model)
        {
           try
           {
               var eventos = await _eventoService.UpdateEvento(id, model);

               if (eventos == null) return BadRequest("Erro ao tentar atualizar evento.");

               return Ok(eventos);
           }
           catch (Exception ex)
           {
               return this.StatusCode(StatusCodes.Status500InternalServerError,
                                      $"Erro ao tentar atualizar eventos. Error: {ex.Message}");
           }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
           try
           {
               return await _eventoService.DeleteEvento(id) ? Ok("Deletado.") : BadRequest("Evento não deletado.");
           }
           catch (Exception ex)
           {
               return this.StatusCode(StatusCodes.Status500InternalServerError,
                                      $"Erro ao tentar deletar eventos. Error: {ex.Message}");
           }
        }
    }
}