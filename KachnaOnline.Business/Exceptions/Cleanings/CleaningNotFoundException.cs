using System;

namespace KachnaOnline.Business.Exceptions.Cleanings
{
    /// <summary>
    /// Thrown when a cleaning was not found (e.g. when a wrong ID has been passed in a request).
    /// </summary>
    public class CleaningNotFoundException : Exception
    {
        public CleaningNotFoundException() : base("The specified cleaning does not exist.")
        {
        }
    }
}
