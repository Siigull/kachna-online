using System;
using KachnaOnline.Dto.Users;

namespace KachnaOnline.Dto.Cleanings
{
    /// <summary>
    /// Represents a past, a current or a future cleaning.
    /// </summary>
    public class CleaningDto : BaseCleaningDto
    {
        /// <summary>
        /// A cleaning ID.
        /// </summary>
        /// <example>395</example>
        public int Id { get; set; }

        /// <summary>
        /// Only returned from backend to load usernames.
        /// Base only has user ids.
        /// </summary>
        public UserDto[] AssignedUsersDtos { get; set; }
    }
}
