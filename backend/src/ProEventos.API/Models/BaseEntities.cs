using System;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.API.Models
{
    public class BaseEntities
    {
        [Key]
         public int Id { get; set; }
    }
}