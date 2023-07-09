import {RouteProp} from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import RadioForm from 'react-native-simple-radio-button'
import * as DDN from 'vision-camera-dynamsoft-document-normalizer'
import type {DetectedQuadResult} from 'vision-camera-dynamsoft-document-normalizer'
import Share, {ShareOptions} from 'react-native-share'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../../App'

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ResultViewer'>
  route: RouteProp<RootStackParamList, 'ResultViewer'>
}

const radio_props = [
  {label: 'Binary', value: 0},
  {label: 'Gray', value: 1},
  {label: 'Color', value: 2},
]

let normalizedResult: any = {}

function ResultViewerScreen(props: Props) {
  const [normalizedImagePath, setNormalizedImagePath] = useState<
    undefined | string
  >()

  useEffect(() => {
    normalizedResult = {}
    normalize(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const share = () => {
    console.log('save')
    let options: ShareOptions = {}
    options.url = 'file://' + normalizedImagePath
    Share.open(options)
  }

  const normalize = async (value: number) => {
    console.log(value)
    if (normalizedResult[value]) {
      setNormalizedImagePath(normalizedResult[value])
    } else {
      if (value === 0) {
        await DDN.initRuntimeSettingsFromString(
          '{"GlobalParameter":{"Name":"GP","MaxTotalImageDimension":0},"ImageParameterArray":[{"Name":"IP-1","NormalizerParameterName":"NP-1","BaseImageParameterName":""}],"NormalizerParameterArray":[{"Name":"NP-1","ContentType":"CT_DOCUMENT","ColourMode":"ICM_BINARY"}]}',
        )
      } else if (value === 1) {
        await DDN.initRuntimeSettingsFromString(
          '{"GlobalParameter":{"Name":"GP","MaxTotalImageDimension":0},"ImageParameterArray":[{"Name":"IP-1","NormalizerParameterName":"NP-1","BaseImageParameterName":""}],"NormalizerParameterArray":[{"Name":"NP-1","ContentType":"CT_DOCUMENT","ColourMode":"ICM_GRAYSCALE"}]}',
        )
      } else {
        await DDN.initRuntimeSettingsFromString(
          '{"GlobalParameter":{"Name":"GP","MaxTotalImageDimension":0},"ImageParameterArray":[{"Name":"IP-1","NormalizerParameterName":"NP-1","BaseImageParameterName":""}],"NormalizerParameterArray":[{"Name":"NP-1","ContentType":"CT_DOCUMENT","ColourMode":"ICM_COLOUR"}]}',
        )
      }
      console.log('update settings done')
      const detectionResult: DetectedQuadResult =
        props.route.params.detectionResult
      const photoPath = props.route.params.photoPath

      if (!photoPath) throw new Error('photoPath is undefined')

      const normalizedImageResult = await DDN.normalizeFile(
        photoPath,
        detectionResult.location,
        {saveNormalizationResultAsFile: true},
      )
      console.log({normalizedImageResult})

      if (!normalizedImageResult.imageURL) return

      normalizedResult[value] = normalizedImageResult.imageURL
      setNormalizedImagePath(normalizedImageResult.imageURL)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {normalizedImagePath && (
        <Image
          style={[StyleSheet.absoluteFill, styles.image]}
          source={{uri: 'file://' + normalizedImagePath}}
        />
      )}
      <View style={styles.control}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={share} style={styles.button}>
            <Text style={{fontSize: 15, color: 'black', alignSelf: 'center'}}>
              Share
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.radioContainer}>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            formHorizontal={true}
            labelHorizontal={false}
            onPress={normalize}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  control: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    height: '15%',
    width: '100%',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  radioContainer: {
    flex: 0.7,
    padding: 5,
    margin: 3,
  },
  buttonContainer: {
    flex: 0.3,
    padding: 5,
    margin: 3,
  },
  button: {
    backgroundColor: 'ghostwhite',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    padding: 8,
    margin: 3,
  },
  image: {
    resizeMode: 'contain',
  },
})

export default ResultViewerScreen
