import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import SliderItem from '../SliderItem'
import Header from '../Header'
import './index.css'

const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

class NxtSlides extends Component {
  state = {
    activeTab: 0,
    item: initialSlidesList[0],
    slidesList: initialSlidesList,
    isHeadingClicked: false,
    isDescriptionClicked: false,
  }

  getSlide = item => {
    const {slidesList} = this.state
    const index = slidesList.findIndex(each => each.id === item.id)
    this.setState({item, activeTab: index})
  }

  newSlide = () => {
    const {slidesList, activeTab} = this.state
    const newItem = {
      id: uuidv4(),
      heading: 'Heading',
      description: 'Description',
    }
    const updatedList = slidesList
    updatedList.splice(activeTab + 1, 0, newItem)
    // this.setState(prevState => ({
    //   slidesList: [...prevState.slidesList],
    // }))
    this.setState({slidesList: updatedList})
    this.setState({item: newItem})
    this.setState(prevState => ({activeTab: prevState.activeTab + 1}))
  }

  onChangeItem = event => {
    const {slidesList, item} = this.state
    const updatedList = slidesList.map(each => {
      if (each.id === item.id) {
        return {
          ...each,
          [event.target.name]: event.target.value,
        }
      }
      return each
    })

    this.setState({
      slidesList: updatedList,
    })
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        [event.target.name]: event.target.value,
      },
    }))
  }

  headingClicked = () => {
    this.setState({isHeadingClicked: true})
  }

  descriptionClicked = () => {
    this.setState({isDescriptionClicked: true})
  }

  inputFocusLooseHeading = () => {
    this.setState({isHeadingClicked: false})
  }

  inputFocusLooseDescription = () => {
    this.setState({isDescriptionClicked: false})
  }

  render() {
    const {
      item,
      slidesList,
      isDescriptionClicked,
      isHeadingClicked,
      activeTab,
    } = this.state
    const {heading, description} = item
    return (
      <div className="app-container">
        <Header />
        <button type="button" className="new-tab-btn" onClick={this.newSlide}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
            alt="new plus icon"
            className="plus-icon"
          />
          New
        </button>
        <div className="slides-container">
          <ol className="slides-list">
            {slidesList.map((eachSlide, index) => (
              <SliderItem
                activeTab={activeTab + 1}
                index={index + 1}
                itemDetails={eachSlide}
                key={eachSlide.id}
                clickSlideItem={this.getSlide}
              />
            ))}
          </ol>
          <div className="slider-preview">
            {!isHeadingClicked ? (
              <h1 onClick={this.headingClicked}>{heading}</h1>
            ) : (
              <input
                value={heading}
                onBlur={this.inputFocusLooseHeading}
                className="input-element"
                name="heading"
                onChange={this.onChangeItem}
              />
            )}
            {!isDescriptionClicked ? (
              <p onClick={this.descriptionClicked}>{description}</p>
            ) : (
              <input
                value={description}
                className="input-element"
                onBlur={this.inputFocusLooseDescription}
                name="description"
                onChange={this.onChangeItem}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default NxtSlides
