import { Spinner } from '@chakra-ui/react'
function LoadingPage() {
    return(
        <div style={styles.background}>
          <Spinner 
          thickness='4px'
          color='red.500'
          size='xl' 
          />
        </div>
    )
}

const styles = {
    background: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

export default LoadingPage;
