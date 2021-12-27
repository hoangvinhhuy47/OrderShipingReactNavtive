import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Creditor from './Creditor.view';
import WaitingCreditor from './../waiting/WaitingCreditor';
import CreditorWaitingReceiveOther from './../waiting/CreditorWaitingReceiveOther';
import FinishCreditor from './../finish/FinishCreditor';
import HandleCreditor from './../handle/HandleCreditor';
import SubmissionCreditor from './../submission/SubmissionCreditor';
import DetailEnvoiceCreditor from './../detailEnvoice/DetailEnvoiceCreditor';
import FinishCreditorDetail from './../finish/FinishCreditorDetail';
import CameraScreenToDetail from '../../camera/CameraScreenToDetail.view';
import CameraScreen from '../../camera/CameraScreen.view';

const CreditorSN = createStackNavigator();

const CreditorStack = (props: any) => {
  return (
    <CreditorSN.Navigator initialRouteName='Creditor' screenOptions={{ headerShown: false }}>
      <CreditorSN.Group>
        <CreditorSN.Screen name='Creditor' component={Creditor} />
      </CreditorSN.Group>
      <CreditorSN.Group>
        <CreditorSN.Screen name='WaitingCreditor' component={WaitingCreditor} />
      </CreditorSN.Group>
      <CreditorSN.Group>
        <CreditorSN.Screen name='FinishCreditor' component={FinishCreditor} />
      </CreditorSN.Group>
      <CreditorSN.Group>
        <CreditorSN.Screen name='HandleCreditor' component={HandleCreditor} />
      </CreditorSN.Group>
      <CreditorSN.Group>
        <CreditorSN.Screen name='SubmissionCreditor' component={SubmissionCreditor} />
      </CreditorSN.Group>
      <CreditorSN.Group>
        <CreditorSN.Screen name='DetailEnvoiceCreditor' component={DetailEnvoiceCreditor} />
      </CreditorSN.Group>
      <CreditorSN.Group>
        <CreditorSN.Screen name='FinishCreditorDetail' component={FinishCreditorDetail} />
      </CreditorSN.Group>
      <CreditorSN.Group>
        <CreditorSN.Screen name='CameraScreenDetail' component={CameraScreenToDetail} />
      </CreditorSN.Group>
      <CreditorSN.Group>
        <CreditorSN.Screen name='CreditorWaitingReceiveOther' component={CreditorWaitingReceiveOther} />
      </CreditorSN.Group>
      <CreditorSN.Group>
        <CreditorSN.Screen name='CameraScreen' component={CameraScreen} />
      </CreditorSN.Group>
    </CreditorSN.Navigator>
  );
};

export default CreditorStack;
