using System;
using System.ComponentModel.DataAnnotations;

namespace KachnaOnline.Dto.Cleanings
{
    /// <summary>
    /// Represents a base cleaning DTO.
    /// </summary>
    public class BaseCleaningDto
    {
        /// <summary>
        /// A name of the cleaning.
        /// </summary>
        /// <example>Semestrální úklid</example>
        [StringLength(128)]
        [Required(AllowEmptyStrings = false)]
        public string Name { get; set; }

        /// <summary>
        /// A place associated with the cleaning.
        /// </summary>
        /// <example>Bar</example>
        [StringLength(256)]
        public string Place { get; set; }

        /// <summary>
        /// Cleaning instructions.
        /// </summary>
        /// <example>Postupujte podle příručky.</example>
        [Required(AllowEmptyStrings = false)]
        public string CleaningInstructions { get; set; }

        /// <summary>
        /// A list of IDs of users assigned to the cleaning.
        /// </summary>
        /// <example>[4, 6, 68]</example>
        public int[] AssignedUsersIds { get; set; }

        /// <summary>
        /// How many participants should ideally attend the cleaning.
        /// </summary>
        /// <example>3</example>
        [Required]
        public int IdealParticipantsCount { get; set; }

        /// <summary>
        /// If a cleaning was finished
        /// </summary>
        /// <example>false</example>
        [Required]
        public bool Finished { get; set; }

        /// <summary>
        /// A beginning of the event.
        /// </summary>
        /// <example>2022-09-18T12:30</example>
        [Required]
        public DateTime From { get; set; }

        /// <summary>
        /// An end of the event.
        /// </summary>
        /// <example>2022-09-20T19:00</example>
        [Required]
        public DateTime To { get; set; }

        /// <summary>
        /// The linked planned states IDs.
        /// </summary>
        /// <example>[357, 358, 360]</example>
        public int[] LinkedPlannedStateIds { get; set; }
    }
}
