import CytoscapeComponent from 'react-cytoscapejs';
import graph from '../graph.json';

export default function CytoscapeContainer() {
  return <CytoscapeComponent elements={graph} 
          pan={ { x: 300, y: 200 } } 
          style={ { height: '450px',
                    border: '2px solid black',
                    marginBottom: '2rem' } }
          autoungrabify={true}  
        />;
}
