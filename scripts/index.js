import React from 'react';
import ReactDOM from 'react-dom';
import CytoscapeComponent from 'react-cytoscapejs';

const CytoscapeContainer = () => {
    const elements = [{"date":{"id":"n0"},"position":{"x":-58,"y":-12}},{"date":{"id":"n4"},"position":{"x":61,"y":-11}},{"date":{"id":"n1"},"position":{"x":21,"y":67}},{"date":{"id":"n2"},"position":{"x":-67,"y":12}},{"date":{"id":"n3"},"position":{"x":1,"y":26}},{"date":{"id":"n5"},"position":{"x":-42,"y":45}},{"date":{"id":"n6"},"position":{"x":-13,"y":48}},{"date":{"id":"n7"},"position":{"x":64,"y":51}},{"date":{"id":"n8"},"position":{"x":-17,"y":-1}},{"date":{"id":"n9"},"position":{"x":-19,"y":70}},{"date":{"id":"n10"},"position":{"x":-70,"y":65}},{"date":{"id":"n11"},"position":{"x":-28,"y":-63}},{"date":{"id":"n12"},"position":{"x":-67,"y":37}},{"date":{"id":"n13"},"position":{"x":12,"y":-55}},{"date":{"id":"n14"},"position":{"x":-64,"y":-66}},{"date":{"id":"n15"},"position":{"x":-37,"y":19}},{"date":{"id":"n16"},"position":{"x":55,"y":-58}},{"date":{"id":"n17"},"position":{"x":23,"y":-7}},{"date":{"id":"n18"},"position":{"x":35,"y":35}},{"date":{"id":"n19"},"position":{"x":-48,"y":69}},{"date":{"id":"n20"},"position":{"x":-20,"y":-29}},{"date":{"id":"n21"},"position":{"x":-61,"y":-38}},{"data":{"source":"n0","target":"n4"}}];
    return <CytoscapeComponent elements={elements} style={ { width: '600px', height: '600px' } } />;
}

ReactDOM.render( React.createElement(MyApp, document.getElementById('root')));
