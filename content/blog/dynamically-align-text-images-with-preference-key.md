+++
title = 'Horizontally Align Images with Dynamic Text Views in a VStack in SwiftUI 🚧 '
date = 2024-07-29T17:00:11+03:00
draft = false
+++

## The Problem 😓:

I encountered this situation where I needed to place an `Image` next to my `Text`.<br>
However, the image had to be horizontally aligned with another image below, which was positioned in a different `HStack`.<br><br>

<h3>Check out these two scenarios:</h3><br>

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

<br>

But this is what I want to achieve: have the images aligned even if they are part of different HStack views.

{{< figure src="/images/articles/goodAlign.gif" caption= "Aligned no matter the length! ">}}
<br>

<h3>Let us go through the solution step by step:</h3>

First, we need to define a custom `PreferenceKey` that calculates the maximum width value based on the provided inputs:
<br>

```swift
struct MaxWidthPreferenceKey: PreferenceKey {
    static let defaultValue: CGFloat = 0

    static func reduce(
        value: inout CGFloat,
        nextValue: () -> CGFloat
    ) {
        value = max(value, nextValue())
    }
}
```

<br>

After that, I like to create an extension on `View` to avoid boilerplate code. This allows us to use `trackWidth` on any view we want by simply applying the modifier. This approach utilizes `GeometryReader` inside a background modifier so that we do not mess with the native SwiftUI alignment.<br>

```swift
extension View {
    func trackMaxWidth() -> some View {
        self.background(GeometryReader { geometry in
            Color.clear
                .preference(key: MaxWidthPreferenceKey.self, value: geometry.size.width)
        })
    }
}
```

<br>

Then we add a `State` variable to dynamically adapt the width based on text length.

```swift
@State private var maxWidth: CGFloat?
```

<br>

And lastly we need a way to intercept those geometry reader changes:<br>

```swift
.onPreferenceChange(MaxWidthPreferenceKey.self) {
    maxWidth = $0
}
```

<br>

I'll include the full code below for easier review:<br>

```swift
struct ContentView: View {
    @State private var maxWidth: CGFloat?
    private var longText = "looooooongtextttttt"
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
        .onPreferenceChange(MaxWidthPreferenceKey.self) {
            maxWidth = $0
        }
        .padding()
        .background(.orange)
        .padding()
    }

    private func labelView(text: String) -> some View {
        HStack(spacing: 10) {
            Text(text)
                .font(.system(size: 16, weight: .regular))
                .trackMaxWidth()
                .frame(width: maxWidth, alignment: .leading)
                .background(.green)
            Image(systemName: "heart")
                .font(.system(size: 13, weight: .light))
        }
        .background(.yellow)
    }
}

struct MaxWidthPreferenceKey: PreferenceKey {
    static let defaultValue: CGFloat = 0

    static func reduce(
        value: inout CGFloat,
        nextValue: () -> CGFloat
    ) {
        value = max(value, nextValue())
    }
}

extension View {
    func trackMaxWidth() -> some View {
        self.background(GeometryReader { geometry in
            Color.clear
                .preference(key: MaxWidthPreferenceKey.self, value: geometry.size.width)
        })
    }
}

```

<br>
<br>

## Thanks for stopping by! 🪴
