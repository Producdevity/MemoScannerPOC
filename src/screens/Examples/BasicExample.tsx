import React, {useState, useEffect} from 'react'
import {Image, Text} from 'react-native'
import DocumentScanner, {
  ScanDocumentOptions,
} from 'react-native-document-scanner-plugin'

export default () => {
  const [scannedImage, setScannedImage] = useState<string | null>(null)

  const scannerOptions: ScanDocumentOptions = {
    letUserAdjustCrop: true,
    maxNumDocuments: 2,
  }
  const scanDocument = async () => {
    // start the document scanner
    const {scannedImages} = await DocumentScanner.scanDocument(scannerOptions)

    // get back an array with scanned image file paths
    if (scannedImages && scannedImages.length > 0) {
      // set the img src, so we can view the first scanned image
      setScannedImage(scannedImages[0])
    }
  }

  useEffect(() => {
    // call scanDocument on load
    scanDocument()
  }, [])

  return scannedImage ? (
    <Image
      resizeMode="contain"
      style={{width: '100%', height: '100%'}}
      source={{uri: scannedImage}}
    />
  ) : (
    <View style={{{flex:1}}><Text>No Scanned Image...</Text></View>
  )
}
