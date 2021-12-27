import {StyleSheet} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
 
import {mainColors, Fonts} from '../../../constants';

 const styles = StyleSheet.create({
    groupButton: {
        marginVertical: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: hp(20),
      },
      buttonitem: {
        paddingTop: 5,
        height: '100%',
        width: wp(45),
        flexDirection: 'column',
      },
      VImageButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
      },
      ImageViewButton: {
        paddingLeft: 3.5,
        width: 75,
        height: 75,
        backgroundColor: mainColors.buttoncolor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
      },
      shadowAndroid: {
        elevation: 5,
      },
      shadowIos: {
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.21,
        shadowRadius: 4,
      },
      ImageButton: {
        width: 42,
        height: 42,
      },
      VtitleButton: {
        width:'100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      titleButton: {
        textAlign:'center',
        textTransform: 'uppercase',
        fontSize: wp(4.4),
        fontWeight: '600',
        color: mainColors.titleColor,
        fontFamily: Fonts.Roboto_Slab_Regular
      },
  });

  
export default styles;