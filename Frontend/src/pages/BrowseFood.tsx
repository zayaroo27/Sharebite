import { FoodCard } from '../components/FoodCard'

export function BrowseFood() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Browse Food</h1>
      <p className="mt-2 text-gray-700">Available donations (placeholder list).</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FoodCard title="Bread" description="Fresh bread (same day)" quantity="2 loaves" location="City Center" />
        <FoodCard title="Rice" description="Cooked rice" quantity="3 boxes" location="North Side" />
        <FoodCard title="Vegetables" description="Mixed vegetables" quantity="1 bag" location="South Market" />
      </div>
    </div>
  )
}
