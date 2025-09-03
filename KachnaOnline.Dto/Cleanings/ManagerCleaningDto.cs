namespace KachnaOnline.Dto.Cleanings
{
    /// <summary>
    /// Represents a past, a current or a future cleaning as seen by cleanings manager.
    /// </summary>
    public class ManagerCleaningDto : CleaningDto
    {
        /// <summary>
        /// An ID of the cleanings manager who created this event.
        /// </summary>
        /// <example>15</example>
        public int MadeById { get; set; }
    }
}
