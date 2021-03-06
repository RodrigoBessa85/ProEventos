using System.Collections.Generic;

namespace ProEventos.Domain.Models
{
    public class Palestrante: BaseEntities
    {
        public string Nome { get; set; }

        public string MiniCurriculo { get; set; }

        public string ImageURL { get; set; }

        public string Telefone { get; set; }

        public string Email { get; set; }

        public IEnumerable<RedeSocial> RedesSociais { get; set; }

        public IEnumerable<PalestranteEvento> PalestranteEventos { get; set; }
    }
}