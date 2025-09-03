using System;

namespace KachnaOnline.Business.Exceptions.Cleanings
{
    /// <summary>
    /// Thrown when a manipulation (e.g. planning or deleting) with a cleaning fails (e.g. due to a database error).
    /// </summary>
    public class CleaningManipulationFailedException : Exception
    {
        private int? CleaningId { get; }

        public CleaningManipulationFailedException() : base("Operation with the given cleaning failed.")
        {
        }

        public CleaningManipulationFailedException(string message) : base(message)
        {
        }

        public CleaningManipulationFailedException(string message, int cleaningId) : base(message)
        {
            this.CleaningId = CleaningId;
        }

        public CleaningManipulationFailedException(string message, Exception innerException) : base(message,
            innerException)
        {
        }

        public CleaningManipulationFailedException(string message, Exception innerException, int cleaningId) : base(message,
            innerException)
        {
            this.CleaningId = CleaningId;
        }
    }
}
