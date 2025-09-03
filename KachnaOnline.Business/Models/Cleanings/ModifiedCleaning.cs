using System;
using System.Collections.Generic;

namespace KachnaOnline.Business.Models.Cleanings
{
    /// <summary>
    /// A model representing a modified cleaning.
    /// </summary>
    public class ModifiedCleaning
    {
        /// <summary>
        /// A name of the cleaning.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// A place associated with the cleaning.
        /// </summary>
        public string Place { get; set; }

        /// <summary>
        /// Cleaning instructions.
        /// </summary>
        public string CleaningInstructions { get; set; }

        /// <summary>
        /// A list of IDs of users assigned to the cleaning.
        /// </summary>
        public List<int> AssignedUsersIds { get; set; }

        /// <summary>
        /// How many participants should ideally attend the cleaning.
        /// </summary>
        public int IdealParticipantsCount { get; set; }

        /// <summary>
        /// If a cleaning was finished
        /// </summary>
        public bool Finished { get; set; }

        /// <summary>
        /// A beginning of the cleaning.
        /// </summary>
        public DateTime From { get; set; }

        /// <summary>
        /// An end of the cleaning.
        /// </summary>
        public DateTime To { get; set; }
    }
}