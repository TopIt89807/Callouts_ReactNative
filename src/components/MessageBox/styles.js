import { Styles, Fonts, Colors, Metrics } from 'theme'

export default {
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .3)',
  },
  titleContainer: {
    margin: 8,
  },
  title: {
    ...Fonts.style.h3,
  },
  textContainer: {
    margin: 8,
  },
  text: {
    fontSize: Fonts.size.h6,
  },
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    width: Metrics.screenWidth * 0.8,
    padding: 12,
    borderRadius: 12,
  },
  button: {
    alignSelf: 'flex-end',
    width: 80,
    height: 36,
    margin: 8,
    marginTop: 16,
  },
  buttonText: {

  }
}
