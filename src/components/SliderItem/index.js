import './index.css'

const SliderItem = props => {
  const {itemDetails, clickSlideItem, index, activeTab} = props
  const {description, heading, id} = itemDetails
  console.log(id)

  return (
    <li
      testid={`slideTab${index}`}
      className={`slider-item-container ${index === activeTab && 'active'}`}
      onClick={() => clickSlideItem(itemDetails)}
    >
      <p>{index}</p>
      <div className="slide">
        <h3>{heading}</h3>
        <p>{description}</p>
      </div>
    </li>
  )
}

export default SliderItem
