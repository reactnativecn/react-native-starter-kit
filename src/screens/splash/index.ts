import Splash from './Splash';
import reducer from './reducer';
import * as actions from './actions';
import { widget } from '../../store/widgetState';
import homeSaga from './saga';
import { NavigationScreenProps } from 'react-navigation';

export default widget(reducer, actions, homeSaga)(Splash);
