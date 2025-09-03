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
    }
}