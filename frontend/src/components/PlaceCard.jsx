function PlaceCard({ place, onWishlist }) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-md ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-2xl">
      <img
        src={place.image}
        alt={place.name}
        className="h-60 w-full object-cover"
      />

      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-slate-900">{place.name}</h3>
          <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
            {place.state}
          </span>
        </div>

        <p className="text-sm leading-7 text-slate-600">{place.description}</p>

        {onWishlist && (
          <button
            onClick={() => onWishlist(place)}
            className="mt-5 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
          >
            Add to Wishlist
          </button>
        )}
      </div>
    </div>
  );
}

export default PlaceCard;