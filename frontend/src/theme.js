import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiButton: {
      root: {
        fontWeight: 'bold',
        color: '#fff',
        margin: '10px',
        textDecoration: 'none',
        background: 'linear-gradient(45deg, #021b79 30%, #0575e6 90%)',
        '&:hover': {
          background: 'linear-gradient(45deg, #0575e6 30%, #021b79 90%)'
        }
      }
    },
    MuiDrawer: {
      paperAnchorRight: {
        width: '250px'
      }
    }
  }
})
