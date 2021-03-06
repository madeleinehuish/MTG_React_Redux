import React from 'react';
import styles from './Filters.css';
import { ALL_BLOCKS as allBlocks } from '../../../config';
import { DEFAULT_BLOCK } from '../../../config'

// const defaultBlock = "Oct 19 to Jan 20" //TODO: add this to a config

const standardBlocks = React.forwardRef((props, ref) => {
	let list = allBlocks.map(elem => {
		// console.log('inside of standardBlocks: name: ', elem.name, ' sets: ', elem.sets);

		return <option value={elem.name} val="test" key={elem.name} onClick={(event)=>props.handleNewBlock(event)}>{elem.name}</option>
	})

	return (
		<select className={styles.select} onChange={(event)=>props.handleNewBlock(event)} ref={ref}>
			<option default value={DEFAULT_BLOCK}>sort by block (current)</option>
			{list}
			{/* <option value="mrd">Mirrodin</option>
			<option value="dst">Darksteel</option>
			<option value="5dn">Fifth Dawn</option>
			<option value="som">Scars of Mirrodin</option>
			<option value="mbs">Mirrodin Besieged</option>
			<option value="nph">New Phyrexia</option> */}
		</select>
	)
})

export default standardBlocks;
