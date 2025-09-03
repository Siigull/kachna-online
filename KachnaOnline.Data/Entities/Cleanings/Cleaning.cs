using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using KachnaOnline.Data.Entities.Users;

namespace KachnaOnline.Data.Entities.Cleanings
{
    public class Cleaning
    {
        [Key] public int Id { get; set; }
        [Required] public int MadeById { get; set; }

        [Required(AllowEmptyStrings = false)]
        [StringLength(128)]
        public string Name { get; set; }

        [StringLength(256)] public string Place { get; set; }

        [Required] public string CleaningInstructions { get; set; }

        public List<int> AssignedUsersIds { get; set; }
        public int IdealParticipantsCount { get; set; }
        public bool Finished { get; set; }

        [Required]
        [Column(TypeName = "timestamp without time zone")]
        public DateTime From { get; set; }

        [Required]
        [Column(TypeName = "timestamp without time zone")]
        public DateTime To { get; set; }

        // Navigation properties
        public virtual User MadeBy { get; set; }
    }
}
