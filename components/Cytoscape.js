import { useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import graph from '../graph.json';

export default function CytoscapeContainer() {
    return <CytoscapeComponent elements={graph} style={ { width: '600px', height: '600px' } } />;
}
