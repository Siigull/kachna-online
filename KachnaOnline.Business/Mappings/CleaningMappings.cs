using System.Linq;
using AutoMapper;
using AutoMapper.Internal;
using KachnaOnline.Business.Models.Cleanings;
using KachnaOnline.Dto.Cleanings;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using CleaningEntity = KachnaOnline.Data.Entities.Cleanings.Cleaning;

namespace KachnaOnline.Business.Mappings
{
    public class CleaningMappings : Profile
    {
        public CleaningMappings()
        {
            this.CreateMap<CleaningEntity, Cleaning>();

            this.CreateMap<NewCleaning, CleaningEntity>();
            this.CreateMap<ModifiedCleaning, CleaningEntity>();

            this.CreateMap<Cleaning, CleaningDto>();
            this.CreateMap<Cleaning, ManagerCleaningDto>();

            this.CreateMap<BaseCleaningDto, NewCleaning>();
            this.CreateMap<BaseCleaningDto, ModifiedCleaning>();
        }
    }
}
