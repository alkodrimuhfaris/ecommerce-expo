import {Platform} from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';

export default async function selectAction(
  result = {},
  updateAva,
  setAvatar,
  setOpenAlert,
  setPropAlert,
) {
  const uploadData = new FormData();
  console.log(result);
  if (!result.cancelled) {
    if (result.type === 'image') {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.uri,
        [],
        {compress: 0.4},
      );
      let uri = manipResult.uri;
      let ext = uri.substr(uri.lastIndexOf('.') + 1);
      console.log(manipResult);
      console.log(manipResult.uri);
      console.log('file name');
      console.log(result.fileName);
      console.log('type');
      console.log(result.type);
      uploadData.append('avatar', {
        uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
        name: 'avatar.' + ext,
        type: result.type + '/' + ext,
      });
      console.log(uploadData);
      updateAva(uploadData);
      setAvatar(manipResult.uri);
    } else {
      setPropAlert({
        content: 'File must be an image!',
        confirmText: 'Yes',
        confirm: () => {
          setOpenAlert(false);
        },
        useOneBtn: true,
      });
      setOpenAlert(true);
    }
  }
}
