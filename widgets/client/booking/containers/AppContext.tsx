import * as React from 'react';
import { connection } from '../connection';
import { IBooking } from '../types';

interface IState {
  activeRoute: string;
  activeBooking: IBooking | null;
  activeBlock: string | null;
  activeFloor: string | null;
  activeProduct: string | null;
  isFormVisible: boolean;
  isPopupVisible: boolean;
}

interface IStore extends IState {
  goToIntro: () => void;
  goToBooking: (booking: IBooking) => void;
  goToBookings: () => void;
  goToBlock: (blockId: string) => void;
  goToFloor: (floorId: string) => void;
  goToProduct: (productId: string) => void;
  getBooking: () => IBooking;
  showForm: () => void;
  showPopup: () => void;
  closePopup: () => void;
}

const AppContext = React.createContext({} as IStore);

export const AppConsumer = AppContext.Consumer;

export class AppProvider extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      activeRoute: 'INTRO',
      activeBooking: null,
      activeBlock: null,
      activeFloor: null,
      activeProduct: null,
      isFormVisible: false,
      isPopupVisible: false
    };
  }

  goToIntro = () => {
    this.setState({
      activeRoute: 'INTRO',
      activeBooking: null
    });
  };

  goToBooking = (booking: any) => {
    this.setState({
      activeRoute: 'BOOKING',
      activeBooking: booking
    });
  };

  goToBookings = () => {
    this.setState({
      activeRoute: 'BOOKING',
      activeBlock: null
    });
  };

  goToBlock = (blockId: any) => {
    this.setState({
      activeRoute: 'BLOCK_DETAIL',
      activeBlock: blockId
    });
  };

  goToFloor = (floorId: any) => {
    this.setState({
      activeRoute: 'FLOOR_DETAIL',
      activeFloor: floorId
    });
  };

  goToProduct = (productId: string) => {
    this.setState({
      activeRoute: 'PRODUCT_DETAIL',
      activeProduct: productId
    });
  };

  getBooking = () => {
    return connection.data.booking;
  };

  showForm = () => {
    this.setState({
      isFormVisible: true
    });
  };

  /*
   * When load type is popup, Show popup and show one of callout and form
   */
  showPopup = () => {
    this.setState({ isPopupVisible: true });

    return this.setState({ isFormVisible: true });
  };

  /*
   * When load type is popup, Hide popup
   */
  closePopup = () => {
    this.setState({
      isPopupVisible: false,
      isFormVisible: false
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          goToBooking: this.goToBooking,
          goToIntro: this.goToIntro,
          goToBlock: this.goToBlock,
          goToBookings: this.goToBookings,
          goToFloor: this.goToFloor,
          goToProduct: this.goToProduct,
          getBooking: this.getBooking,
          showForm: this.showForm,
          showPopup: this.showPopup,
          closePopup: this.closePopup
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
