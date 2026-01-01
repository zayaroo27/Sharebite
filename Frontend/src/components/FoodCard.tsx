export type FoodCardProps = {
  title: string
  description?: string
  quantity?: string
  location?: string
}

export function FoodCard({ title, description, quantity, location }: FoodCardProps) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4">
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      {description ? <p className="mt-1 text-sm text-gray-600">{description}</p> : null}
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-700">
        {quantity ? <span className="rounded bg-gray-100 px-2 py-1">Qty: {quantity}</span> : null}
        {location ? <span className="rounded bg-gray-100 px-2 py-1">{location}</span> : null}
      </div>
    </article>
  )
}
