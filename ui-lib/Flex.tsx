import React, { JSX } from "react"
import { MouseEventHandler, forwardRef, useEffect, useState } from "react"

export interface IFlexProps {
    id?: string,
    className?: string,
    style?: React.CSSProperties,
    children?: React.ReactNode,
    onClick?: MouseEventHandler<HTMLDivElement>,
    verticalCenter?: boolean,
    horizontalCenter?: boolean,
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse',
    spacing?: JSX.Element | string | number,
    spacingStart?: JSX.Element | string | number,
    spacingEnd?: JSX.Element | string | number,
    onMouseDown?: MouseEventHandler<HTMLDivElement>,
    onMouseMove?: MouseEventHandler<HTMLDivElement>,
    onMouseUp?: MouseEventHandler<HTMLDivElement>,
}

const Flex = forwardRef<HTMLDivElement, IFlexProps>((props, ref) => {
    const renderSpacing = (spacing: JSX.Element | string | number | undefined) => {
        if (spacing === undefined) return undefined;
        else if (typeof spacing === 'string' || typeof spacing === 'number') return <span style={{
            width: (props.direction === 'row' || props.direction === undefined) ? spacing : undefined,
            height: props.direction === 'column' ? spacing : undefined
        }}></span>
        else return React.cloneElement(spacing, {
        })
    }
    const renderChildren = (children: React.ReactNode) => {
        if (props.spacing === undefined) return children;
        if (children === undefined) return undefined;
    
        const tempChildren = React.Children.toArray(children);
    
        return tempChildren.map((child, index) => {
            const key = (React.isValidElement(child) && child.key != null) ? child.key : index;
            return (
                <React.Fragment key={key}>
                    {index === 0 && props.spacingStart !== undefined ? renderSpacing(props.spacingStart) : null}
                    {child}
                    {index < tempChildren.length - 1 ? renderSpacing(props.spacing) : null}
                    {index === tempChildren.length - 1 && props.spacingEnd !== undefined ? renderSpacing(props.spacingEnd) : null}
                </React.Fragment>
            );
        });
    };
    
    return <div
        ref={ref}
        id={props.id}
        className={props.className}
        style={{
            display: 'flex',
            flexDirection: props.direction,
            alignItems: props.verticalCenter ? 'center' : undefined,
            justifyContent: props.horizontalCenter ? 'center' : undefined,
            ...props.style
        }}
        onClick={props.onClick}
        onMouseDown={props.onMouseDown}
        onMouseMove={props.onMouseMove}
        onMouseUp={props.onMouseUp}>
        {renderChildren(props.children)}
    </div>
})

const Vertical = forwardRef<HTMLDivElement, IFlexProps>((props, ref) => {
    return <Flex ref={ref} {...props} direction='column' />
})

const Horizontal = forwardRef<HTMLDivElement, IFlexProps>((props, ref) => {
    return <Flex ref={ref} {...props} direction='row' />
})

export { Flex, Vertical, Horizontal }