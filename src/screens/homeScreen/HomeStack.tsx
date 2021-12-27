import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './home/Home.view';
import Waiting from './waiting/Waiting.view';
import WaitingPrinted from './waiting/WaitingPrinted.view';
import WaitingUnprinted from './waiting/WaitingUnprinted.view';
import Finish from './finish/Finish.view';
import Acceptance from './acceptance/Acceptance.view';
import Transportion from './transportion/Transportion.view';
import Submission from './submission/Submission.view';
import DetailEnvoice from './detailEnvoice/DetailEnvoice';
import CameraScreen from '../camera/CameraScreen.view';
import CameraScreenDetail from '../camera/CameraScreenToDetail.view';
import SearchProduct from '../homeScreen/waiting/DialogSearchProduct';
import FinishDetail from './finish/FinishDetail';
import DetailAccptanceOther from './detailEnvoice/DetailAccptanceOther';

const HomeSN = createStackNavigator();

const HomeStack = (props: any) => {
  return (
    <HomeSN.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <HomeSN.Group>
        <HomeSN.Screen name="Home" component={Home} />
      </HomeSN.Group>
      <HomeSN.Group>
        <HomeSN.Screen name="Waiting" component={Waiting} />
        <HomeSN.Screen name="WaitingPrinted" component={WaitingPrinted} />
        <HomeSN.Screen name="WaitingUnprinted" component={WaitingUnprinted} />
      </HomeSN.Group>
      <HomeSN.Group>
        <HomeSN.Screen name="Acceptance" component={Acceptance} />
      </HomeSN.Group>
      <HomeSN.Group>
        <HomeSN.Screen name="Transportion" component={Transportion} />
      </HomeSN.Group>
      <HomeSN.Group>
        <HomeSN.Screen name="Submission" component={Submission} />
      </HomeSN.Group>
      <HomeSN.Group>
        <HomeSN.Screen name="Finish" component={Finish} />
      </HomeSN.Group>
      <HomeSN.Group>
        <HomeSN.Screen name="DetailEnvoice" component={DetailEnvoice} />
      </HomeSN.Group>
      <HomeSN.Group>
        <HomeSN.Screen name="DetailAccptanceOther" component={DetailAccptanceOther} />
      </HomeSN.Group>
      <HomeSN.Group>
        <HomeSN.Screen name="FinishDetail" component={FinishDetail} />
      </HomeSN.Group>
      <HomeSN.Group>
        <HomeSN.Screen name="CameraScreen" component={CameraScreen} />
        
      </HomeSN.Group>
      <HomeSN.Group>
        <HomeSN.Screen name="CameraScreenDetail" component={CameraScreenDetail} />
    
      </HomeSN.Group>
     
      <HomeSN.Group>
        <HomeSN.Screen name="SearchProduct" component={SearchProduct} />
      </HomeSN.Group>
    </HomeSN.Navigator>

  );
};

export default HomeStack;
