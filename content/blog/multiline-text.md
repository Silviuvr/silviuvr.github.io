+++
title = 'SwifUI Multiline Text with an INLINE image at the end'
date = 2023-11-16T19:00:11+03:00
draft = false
+++

{{< figure src="/images/articles/inline.jpg" caption= ". . . ">}}

### The problem I haven’t been able to resolve is how to display an asset image alongside text on its right side. :pensive:

\
While SwiftUI handles inline images with text for SFSymbols, I’ve struggled to find a solution that allows an asset image size to dynamically adjust to the text.
\
\
We also have **`Label`** view, but it only allows us to position the image on the left side of the text, which is not our current requirement.

```swift
Text("Awww ") + Text(Image(systemName: "heart.fill"))
```

<br>
{{< figure src="/images/articles/aw.jpg" caption= "Works really well for SFSymbols ">}}

**But**...Not so well for **`assets Images`**
<br>
<br>
{{< figure src="/images/articles/aw2.jpg" caption= "ugh... ">}}

<br>

> One might be inclined to utilize resize modifiers and introduce a new frame for the image within the text. However, to our surprise, this approach results in an error.

<br>

{{< figure src="/images/articles/err.jpg">}}
<br>
<br>

#### Another way to go about it is by using an `HStack`, where you’ve got a `Text` on the left and an `Image` on the right, and you’d be correct…

```swift
HStack {
    Text("Awww so great")
    Image("info")
        .resizable()
        .scaledToFit()
        .frame(width: 20, height: 20)
}
```

This will yield the same result as the `Text` interpolation option. However….
<br> If we change the code to this:

```swift
HStack {
    Text("This is a multi-line text. It has multiple lines. It has multiple lines.")
    Image("info")
        .resizable()
        .scaledToFit()
        .frame(width: 20, height: 20)
}

```

<br>
{{< figure src="/images/articles/inline2.jpg" caption= "The image doesn’t stay at the end of the text when dealing with multiline text!">}}
<br>

## So, here’s my approach to this problem:
I will declare some constants in order to avoid repetition:

```swift
private var text = "This is a multi-line text. It has multiple lines. It has multiple lines. It has multiple lines. It has multiple lines. "
private var image = "info" // Replace with your image name
private let font: Font = .system(size: 17) // Same size as the image frame
    
var body: some View {
  Text(text)
    .font(font)
  + Text("\(getCustomImage())")
}
```
\
We use the method with the `Text` initializer, but we adapt it.

The **getCustomImage()** function will return a modified `Text` view.

```swift
private func getCustomImage(color: Color = .gray, newSize: CGSize = CGSize(width: 17, height: 17)) -> Text {
       1. if let image = UIImage(named: image),
       2.    let newImage = convertImageToNewFrame(image: image, newFrameSize: newSize) {
       3.     return Text(
                Image(uiImage: newImage)
       4.           .renderingMode(.template)
            )
       5.   .baselineOffset(-1.5)
            .foregroundStyle(color)
        }
        return Text(Image(systemName: "heart.fill"))
    }

```

This function does the following:

>1. It makes sure to safely unwrap the image.
>2. Calls a function that will convert our image to a desired frame.
>3. Returns a `Text` with the `Image` initializer.
>4. Sets the rendering mode to .template in order to be able to change the `foregroundColor` of the image.
>5. Adjust the `baselineOffset` by setting it to a negative value to center the icon within the text.
<br>

#### ***Ensure that the font you choose for the text closely matches or is the same as the image frame.***

And last but not least here’s the `convertImageToNewFrame()` function:

```swift
func convertImageToNewFrame(image: UIImage, newFrameSize: CGSize) -> UIImage? {
    UIGraphicsBeginImageContextWithOptions(newFrameSize, false, 0.0)
    image.draw(in: CGRect(origin: .zero, size: newFrameSize))        let newImage = UIGraphicsGetImageFromCurrentImageContext()
    UIGraphicsEndImageContext()
    return newImage
}

```
<br>

For easier readability, here’s the complete code for the SwiftUI view (iOS 17):

```swift
struct InlineView: View {
    private var text = "This is a multi-line text. It has multiple lines. It has multiple lines. It has multiple lines. It has multiple lines. "
    private var image = "info" // Replace with your image name
    private let font: Font = .system(size: 17)
    
    var body: some View {
        Text(text)
            .font(font)
        + Text("\(getCustomImage())")
    }
    
    private func getCustomImage(color: Color = .gray, newSize: CGSize = CGSize(width: 17, height: 17)) -> Text {
        if let image = UIImage(named: image),
           let newImage = convertImageToNewFrame(image: image, newFrameSize: newSize) {
            return Text(
                Image(uiImage: newImage)
                    .renderingMode(.template)
            )
            .baselineOffset(-1.5)
            .foregroundStyle(color)
            
        }
        return Text(Image(systemName: "heart.fill"))
    }
    
    func convertImageToNewFrame(image: UIImage, newFrameSize: CGSize) -> UIImage? {
        UIGraphicsBeginImageContextWithOptions(newFrameSize, false, 0.0)
        image.draw(in: CGRect(origin: .zero, size: newFrameSize))
        let newImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        return newImage
    }
}

#Preview {
    InlineView()
}


``` 
<br>

## `Thanks for stopping by! 😸`