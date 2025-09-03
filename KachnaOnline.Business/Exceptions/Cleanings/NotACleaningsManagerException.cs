using System;

namespace KachnaOnline.Business.Exceptions.Cleanings
{
    /// <summary>
    /// Thrown when a regular user requests an operation that can only be done by a cleanings manager.
    /// </summary>
    public class NotACleaningsManagerException : Exception
    {
        public NotACleaningsManagerException() : base("You must be a cleanings manager to do that.")
        {
        }
    }
}
