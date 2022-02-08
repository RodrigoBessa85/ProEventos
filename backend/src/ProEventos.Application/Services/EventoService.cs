using System;
using System.Threading.Tasks;
using ProEventos.Application.Interface;
using ProEventos.Domain.Models;
using ProEventos.Persistence.Interfaces;

namespace ProEventos.Application.Services
{
    public class EventoService : IEventoService
    {
        private readonly IBaseRepository _repository;

        private readonly IEventoRepository _eventoRepository;

        public EventoService(IBaseRepository repository, IEventoRepository eventoRepository)
        {
            _repository = repository;
            _eventoRepository = eventoRepository;
        }

        public async Task<Evento> AddEventos(Evento evento)
        {
            try 
            {
                _repository.Add<Evento>(evento);

                if (await _repository.SaveChangesAsync()) 
                {
                    return await _eventoRepository.GetEventoByIdAsync(evento.Id, false);
                }

                return null;
            }
            catch (Exception ex) 
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Evento> UpdateEvento(int eventoId, Evento evento)
        {
            try 
            {
                var retornoEvento = await _eventoRepository.GetEventoByIdAsync(eventoId, false);

                if (retornoEvento == null) return null;

                evento.Id = retornoEvento.Id;

                _repository.Update(evento);

                if (await _repository.SaveChangesAsync()) 
                {
                    return await _eventoRepository.GetEventoByIdAsync(evento.Id, false);
                }

                return null;
            }
            catch (Exception ex) 
            {
                throw new Exception(ex.Message);
            }
        }        

        public async Task<bool> DeleteEvento(int eventoId)
        {
            try 
            {
                var retornoEvento = await _eventoRepository.GetEventoByIdAsync(eventoId, false);

                if (retornoEvento == null) throw new Exception("Evento para deleção, não foi encontrado.");

                _repository.Delete<Evento>(retornoEvento);

                return await _repository.SaveChangesAsync();
            }
            catch (Exception ex) 
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false)
        {
            try 
            {
                var eventos = await _eventoRepository.GetAllEventosAsync(includePalestrantes);

                if (eventos == null) return null;

                return eventos;
            }
            catch (Exception ex) 
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
        {
            try 
            {
                var temas = await _eventoRepository.GetAllEventosByTemaAsync(tema, includePalestrantes);

                if (temas == null) return null;

                return temas;
            }
            catch (Exception ex) 
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false)
        {
            try 
            {
                var evento = await _eventoRepository.GetEventoByIdAsync(eventoId, includePalestrantes);

                if (evento == null) return null;

                return evento;
            }
            catch (Exception ex) 
            {
                throw new Exception(ex.Message);
            }
        }
    }
}