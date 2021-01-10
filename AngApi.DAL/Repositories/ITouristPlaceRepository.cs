using AngApi.DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AngApi.DAL.Repositories
{
    public interface ITouristPlaceRepository
    {
        void AddTouristPlace(TouristPlace touristPlace);
        IEnumerable<TouristPlace> GetTouristPlaces();
        bool DeleteTouristPlace(long touristPlaceId);
        TouristPlace GetTouristPlace(long Id);
    }

    public class TouristPlaceRepository : ITouristPlaceRepository
    {
        private readonly AuthenticationContext _context;
        public TouristPlaceRepository(AuthenticationContext context)
        {
            this._context = context;
        }
        public void AddTouristPlace(TouristPlace touristPlace)
        {
            _context.TouristPlaces.Add(touristPlace);
        }

        public bool DeleteTouristPlace(long touristPlaceId)
        {
            var removed = false;
            TouristPlace touristPlace = GetTouristPlace(touristPlaceId);

            if (touristPlace != null)
            {
                removed = true;
                _context.TouristPlaces.Remove(touristPlace);
            }

            return removed;

        }

        public TouristPlace GetTouristPlace(long Id)
        {
            return _context.TouristPlaces.Where(u => u.Id == Id).FirstOrDefault();
        }

        public IEnumerable<TouristPlace> GetTouristPlaces()
        {
            return _context.TouristPlaces;
        }
    }
}
