namespace KachnaOnline.Business.Models.Cleanings
{
    /// <summary>
    /// A model representing a new cleaning.
    /// </summary>
    public class NewCleaning : ModifiedCleaning
    {
        /// <summary>
        /// An ID of the cleanings manager who created this cleaning.
        /// </summary>
        public int MadeById { get; set; }
    }
}
