using System;

namespace KachnaOnline.Business.Exceptions.Cleanings
{
    /// <summary>
    /// Thrown when a cleaning cannot be modified or removed, because the cleaning was finished.
    /// </summary>
    public class CleaningReadOnlyException : Exception
    {
        public CleaningReadOnlyException() :
            base("Cannot modify a cleaning that has already ended.")
        {
        }
    }
}
