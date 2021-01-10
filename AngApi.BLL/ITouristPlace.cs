using AngApi.DAL.Model;
using AngApi.DAL.UnitOfWork;
using AngApi.DAL.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace AngApi.BLL
{
    public interface ITouristPlace
    {
        TouristPlaceViewModel UpsertTouristPlace(TouristPlaceViewModel touristPlaceVM);
        IEnumerable<TouristPlace> GetTouristPlaces();
        bool DeleteTouristPlace(long touristPlaceId);
        TouristPlace GetTouristPlace(long Id);
    }

    public class BLTouristPlace : ITouristPlace
    {
        private readonly IUnitOfWork _uow;

        public BLTouristPlace(IUnitOfWork uow)
        {
            this._uow = uow;
        }
        public bool DeleteTouristPlace(long touristPlaceId)
        {
            _uow.TouristPlaceViewModel.DeleteTouristPlace(touristPlaceId);
            _uow.Complete();
            return true;
        }

        public TouristPlace GetTouristPlace(long Id)
        {
            if (Id <= default(long))
                throw new ArgumentException("Invalid id");

            return _uow.TouristPlaceViewModel.GetTouristPlace(Id);
        }

        public IEnumerable<TouristPlace> GetTouristPlaces()
        {
            // We may implement validation like checking user roles
            return _uow.TouristPlaceViewModel.GetTouristPlaces();
        }

        public TouristPlaceViewModel UpsertTouristPlace(TouristPlaceViewModel touristPlaceVM)
        {
            if (touristPlaceVM == null)
                throw new ArgumentException("Invalid touristPlace");

            if (string.IsNullOrWhiteSpace(touristPlaceVM.Title))
                throw new ArgumentException("Invalid touristPlace name");

            var _touristPlace = _uow.TouristPlaceViewModel.GetTouristPlace(touristPlaceVM.Id);
            if (_touristPlace == null)
            {
                _touristPlace = new TouristPlace
                {
                  //  UserId = touristPlaceVM.UserId,
                    Title = touristPlaceVM.Title,
                    // Photo = itemDetailVM.PhotoFile.FileName,
                    Image = touristPlaceVM.Image,
                    Description = touristPlaceVM.Description
                };
                _uow.TouristPlaceViewModel.AddTouristPlace(_touristPlace);
            }
            else
            {
                _touristPlace.Title = touristPlaceVM.Title;
                _touristPlace.Image = touristPlaceVM.Image;
                _touristPlace.Description = touristPlaceVM.Description;
            }

            _uow.Complete();

            return touristPlaceVM;
        }
    }
}
