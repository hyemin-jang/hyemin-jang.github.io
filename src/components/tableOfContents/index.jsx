import React, { useMemo } from 'react'
import './index.scss'

export const TableOfContents = ({ items, currentHeaderUrl }) => {
    const replaceItems = useMemo(() => {
        if (currentHeaderUrl) {
            return items.replace(
                `"${currentHeaderUrl}"`,
                `"${currentHeaderUrl}" class="isCurrent"`
            )
        } else {
            return items
        }
    }, [currentHeaderUrl])
    return items ? (
        <nav className="table-of-contents container">
            <div
                className="contents"
                dangerouslySetInnerHTML={{ __html: replaceItems }}
            />
        </nav>
    ) : null
}