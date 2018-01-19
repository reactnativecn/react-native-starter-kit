import Home from './Splash';
import reducer from './reducer';
import * as actions from './actions';
import { widget } from '../../store/widgetState';
import homeSaga from './saga';

export default widget(Home, reducer, actions, homeSaga);
