import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
export const navigationRef = createNavigationContainerRef();

class NavigationService {
  navigate(screenName, params) {
    if (navigationRef.isReady() && screenName) {
      navigationRef.navigate(screenName, params);
    } else {
    }
  }

  goBack() {
    if (navigationRef.isReady()) {
      navigationRef.goBack();
    }
  }

  reset(screenName) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(
        CommonActions.reset({
          M: 0,
          routes: [{ name: screenName }],
        })
      );
    }
  }
}

export default NavigationService;
