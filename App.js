import { StackNavigator } from 'react-navigation'

import Main from './screens/Main'
import Edit from './screens/Edit'

const RootNavigator = StackNavigator({
	Main: { screen: Main },
	Edit: { screen: Edit }
})

export default RootNavigator