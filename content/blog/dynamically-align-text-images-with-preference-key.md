+++
title = 'Horizontally Align Images with Dynamic Text Views in a VStack in SwiftUI 🚧 '
date = 2024-07-24T19:00:11+03:00
draft = false
+++

# The Problem 😓:

I encountered an unusual situation where I needed to place an `Image` next to my `Text`.
However, the image had to be horizontally aligned with another image below, which was positioned in a different horizontal stack `HStack`.<br><br>

<h2>Check out these two scenarios:</h2><br>

{{< figure src="/images/articles/badAlign.gif" caption= "The heart images are not horizontally aligned! ">}}

The code responsible:
```swift

@State private var maxWidth: CGFloat?
private var longText = "looooooongtextttttttt"
private var shortText = "short"

var body: some View {
    VStack(spacing: 20) {
        Group {
            HStack {
                labelView(text: longText)
                Spacer()
                Text("10")
            }
        }

        Divider()
        Group {
            HStack {
                labelView(text: shortText)
                Spacer()
                Text("100")
            }
        }
    }
    .padding()
    .background(.orange)
    .padding()
}

```