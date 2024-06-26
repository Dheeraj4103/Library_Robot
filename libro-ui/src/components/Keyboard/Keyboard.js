// keyboard.js 
import React, { useState } from 'react';
import './Keyboard.css';
import { computeHeadingLevel } from '@testing-library/react';
import { FaDeleteLeft } from "react-icons/fa6";
import { IoQrCodeOutline } from "react-icons/io5";
import { FaKeyboard, FaMicrophone } from 'react-icons/fa';
export default function Keyboard({
	setInput, searchTerm, setSearchTerm, handleSearchClick, inputText, setInputText,
	showKeyboard, setShowKeyboard, SpeechRecognition
}) {
	const [isCaps, setIsCaps] = useState(false);
	const [isShift, setIsShift] = useState(false);

	const handleKeyClick = (key) => {
		if (key === 'Enter') {
			handleEnterKey();
		}
		else if (key === "Ctrl" || key === "Alt" || key === '<' || key === '>') {
		} else if (key === ' ') {
			handleSpaceKey();
		} else if (key === 'Caps Lock') {
			handleCapsLock();
		} else if (key === 'Clear') {
			handleDeleteKey();
		} else if (key === 'Shift') {
			handleShiftKey();
		} else if (key === 'Tab') {
			handleTabKey();
		} else {
			handleRegularKey(key);
		}
	};
	console.log("input", inputText)
	const handleSpaceKey = () => {
		const newContent = inputText + '\u00A0';
		setInputText(newContent);
	};
	const handleEnterKey = () => {
		window.scrollTo(0, -800)
		// const newContent = inputText + '\n'; 
		// setInputText(newContent); 
	};
	const handleCapsLock = () => {
		const updatedCaps = !isCaps;
		setIsCaps(updatedCaps);
		const keys = document.querySelectorAll('.key');
		keys.forEach((key) => {
			const firstSpanElement = key.querySelector('span:first-child');
			if (firstSpanElement) {
				const keyText = firstSpanElement.innerText.toLowerCase();
				if (!['shift', 'alt', 'ctrl', 'enter', 'caps lock', 'tab']
					.includes(keyText)) {
					firstSpanElement.innerText =
						((updatedCaps && isShift) || (!updatedCaps && !isShift))
							? keyText.toLowerCase() : keyText.toUpperCase();
				}
				if (keyText === 'caps lock') {
					firstSpanElement.parentElement.style.backgroundColor =
						(updatedCaps) ? 'blue' : '#445760';
				}
			}
		});
	};
	const handleTabKey = () => {
		const newContent = inputText + ' ';
		setInputText(newContent);
	};

	const handleDeleteKey = () => {
		if (inputText.length === 0) {
			return;
		}
		const newContent = inputText.slice(0, inputText.length - 1);
		setInputText(newContent);
	};

	const handleShiftKey = () => {
		const updatedShift = !isShift;
		setIsShift(updatedShift);
		const keys = document.querySelectorAll('.key');
		keys.forEach((key) => {
			const firstSpanElement = key.querySelector('span:first-child');
			if (firstSpanElement) {
				const keyText = firstSpanElement.innerText.toLowerCase();
				if (!['shift', 'alt', 'ctrl', 'enter', 'caps lock', 'tab'].
					includes(keyText)) {
					firstSpanElement.innerText =
						((updatedShift && isCaps) || (!updatedShift && !isCaps))
							? keyText.toLowerCase() : keyText.toUpperCase();
				}
				if (keyText === 'shift') {
					firstSpanElement.parentElement.style.backgroundColor =
						(updatedShift) ? 'blue' : '#445760';
				}
			}
		});
	}

	const handleRegularKey = (key) => {
		const keys = key.split(/[._]/);
		let newContent;
		if (keys.length > 1) {
			if (isShift) {
				if (keys.length === 3) {
					if (keys[0] === '>') newContent = inputText + '>';
					else newContent = inputText + '_';
				}
				else newContent = inputText + keys[0];
			} else {
				if (keys.length === 3) {
					if (keys[0] === '>') newContent = inputText + '.';
					else newContent = inputText + '-';
				}
				else newContent = inputText + keys[1];
			}
		} else {
			let character = ((isShift && isCaps) || (!isShift && !isCaps))
				? key.toLowerCase() : key.toUpperCase();
			newContent = inputText + character;
		}
		setInputText(newContent);
	};

	return (
		<div className='keyboard'>
			{/* <div className="textcontainer"> 
				<pre>{inputText}</pre> 
				
			</div>  */}
			<div style={{display:"flex" , alignItems: "center"}}>
			<FaMicrophone
				style={{padding: ".5rem"}}
              size={"100px"}
                    onClick={SpeechRecognition.startListening}
                    className="voice-icon"
                />
			<input
				height={"100px"}
				width={"50px"}
				type="textarea"
				style={{ fontSize: "50px" }}
				className="textcontainer"
				value={inputText}
				onChange={(e) => {
					setInputText(e.target.value)
					setSearchTerm(e.target.value);
				}
				}
				onClick={() => window.scrollTo(0, 800)}

				placeholder="Ask me a question..."
			/>
			       <FaKeyboard
                    size={"100px"}
                    onClick={()=> setShowKeyboard(prev => !prev)}
                    className="voice-icon"
                />
				
				<IoQrCodeOutline
                    size={"100px"}
                    onClick={()=> setShowKeyboard(prev => !prev)}
                    className="voice-icon"
                />
				
				</div>
			{showKeyboard && (<div className="keyboardcontainer">
				<div className="container">
					<div className="row">
						{['~.`', '!.1', '@.2', '#.3', '$.4', '%.5',
							'^.6', '&.7', '*.8', '(.9', ').0', '_.-', '+.=',
							'Clear']
							.map((keyvalue) =>
							(
								<div key={keyvalue}

									className='key'
									onClick={() => handleKeyClick(keyvalue)}>
									{keyvalue.includes('.') ? (
										keyvalue.split('.').map((part, index) => (
											<span key={index}>{part}</span>
										))
									) : (
										keyvalue ===
											'Clear'
											? (
												<FaDeleteLeft />
											) : (
												<span>{keyvalue}</span>
											)
									)}

								</div>
							))}
					</div>
					<div className="row">
						{['Tab', 'q', 'w', 'e', 'r', 't', 'y',
							'u', 'i', 'o', 'p', '{_[', '}_]', '|_\\']
							.map((keyvalue) => (
								<div key={keyvalue} className='key'
									onClick={() => handleKeyClick(keyvalue)}>
									{keyvalue.includes('_') ? (
										keyvalue.split('_').map((part, index) => (
											<span key={index}>{part}</span>
										))
									) : (
										<span>{keyvalue}</span>
									)}
								</div>
							))}
					</div>
					<div className="row">
						{['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h',
							'j', 'k', 'l', ':_;', `"_'`, 'Enter']
							.map((keyvalue) => (
								<div key={keyvalue} className='key'
									onClick={() => handleKeyClick(keyvalue)}>
									{keyvalue.includes('_') ? (
										keyvalue.split('_').map((part, index) => (
											<span key={index}>{part}</span>
										))
									) : (
										<span>{keyvalue}</span>
									)}
								</div>
							))}
					</div>
					<div className="row">
						{['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm',
							'<_,', '>_.', '?_/', 'Shift'].map((keyvalue, index) => (
								<div key={index} className='key'
									onClick={() => handleKeyClick(keyvalue)}>
									{keyvalue.includes('_') ? (
										keyvalue.split('_').map((part, index) => (
											<span key={index}>{part}</span>
										))
									) : (
										<span>{keyvalue}</span>
									)}
								</div>
							))}
					</div>
					<div className="row">
						{['Ctrl', 'Alt', ' ', 'Ctrl', 'Alt', '<', '>']
							.map((keyvalue, index) => (
								<div key={index} className='key'
									onClick={() => handleKeyClick(keyvalue)}>
									<span>{keyvalue}</span>
								</div>
							))}
					</div>
				</div>
			</div>)}

		</div>
	)
} 
