import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useEffect, useRef, useState } from 'react'

export const AcceptClause = ({ data, setData }: { data: any; setData: any }) => {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false)
  const contentRef = useRef(null)
  const scrollAreaRef = useRef(null)

  const checkScrollPosition = () => {
    if (contentRef.current && scrollAreaRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = scrollAreaRef.current
      const bottomThreshold = 20 // pixels from bottom to consider as "scrolled to bottom"
      if (scrollHeight - (scrollTop + clientHeight) < bottomThreshold) {
        setIsScrolledToBottom(true)
      }
    }
  }

  useEffect(() => {
    const scrollArea = scrollAreaRef.current
    if (scrollArea) {
      scrollArea.addEventListener('scroll', checkScrollPosition)
      // Initial check in case content is shorter than the container
      checkScrollPosition()
      return () => scrollArea.removeEventListener('scroll', checkScrollPosition)
    }
  }, [scrollAreaRef.current]) // Added scrollAreaRef.current as a dependency

  return (
    <div className="space-y-4">
      <ScrollArea className="h-64 w-full rounded-md border p-4" ref={scrollAreaRef}>
        <div ref={contentRef} className="space-y-4">
          <h3 className="text-lg font-semibold">Conditions d'utilisation</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel
            consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc.
            Nulla facilisi. Sed euismod, nisi vel consectetur interdum, nisl nunc egestas nunc,
            vitae tincidunt nisl nunc euismod nunc. Nulla facilisi. Sed euismod, nisi vel
            consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc.
            Nulla facilisi.
          </p>
          <p>
            Sed euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl
            nunc euismod nunc. Nulla facilisi. Sed euismod, nisi vel consectetur interdum, nisl nunc
            egestas nunc, vitae tincidunt nisl nunc euismod nunc. Nulla facilisi. Sed euismod, nisi
            vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod
            nunc.
          </p>
          <p>
            Nulla facilisi. Sed euismod, nisi vel consectetur interdum, nisl nunc egestas nunc,
            vitae tincidunt nisl nunc euismod nunc. Nulla facilisi. Sed euismod, nisi vel
            consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc.
            Nulla facilisi. Sed euismod, nisi vel consectetur interdum, nisl nunc egestas nunc,
            vitae tincidunt nisl nunc euismod nunc.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel
            consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc.
            Nulla facilisi. Sed euismod, nisi vel consectetur interdum, nisl nunc egestas nunc,
            vitae tincidunt nisl nunc euismod nunc. Nulla facilisi. Sed euismod, nisi vel
            consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc.
            Nulla facilisi.
          </p>
        </div>
      </ScrollArea>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="accepteClauses"
          checked={data.accepteClauses}
          onCheckedChange={(checked) => setData({ ...data, accepteClauses: checked })}
          disabled={!isScrolledToBottom}
        />
        <Label
          htmlFor="accepteClauses"
          className={!isScrolledToBottom ? 'text-muted-foreground' : ''}
        >
          J'ai lu et j'accepte les conditions d'utilisation
        </Label>
      </div>
      {!isScrolledToBottom && (
        <p className="text-sm text-muted-foreground">
          Veuillez lire l'intégralité des conditions pour pouvoir les accepter.
        </p>
      )}
    </div>
  )
}
