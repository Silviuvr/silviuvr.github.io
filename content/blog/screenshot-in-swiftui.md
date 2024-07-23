+++
title = 'How to take a screenshot/snapshot of a Scroll View in SwiftUI.'
date = 2023-10-11T19:00:11+03:00
draft = false
+++

Capturing a long screenshot of a `ScrollView` in SwiftUI can be challenging, but it's quite feasible with the right approach.\
\
In our case, capturing a screenshot of a scroll view that extends **beyond** the visible area of the screen requires several steps.

This is the final screenshot that we will obtain:

{{< figure src="/images/articles/longScreenshot.jpg" caption= "Long scroll view screenshot">}}

### Let’s start with the UI:

```swift

var body: some View {
  ZStack {
    Color.teal.edgesIgnoringSafeArea(.all)
    ScrollView(showsIndicators: false) {
      scrollContent
    }
  }
}

```

\
In this article, we'll use some system images and a button placed inside the scroll view **(`scrollContent`)**. The button will let us capture an image and open an activity controller, allowing us to save the image locally.

```swift

private var scrollContent: some View {
  VStack(spacing: 10) {
    Button("Share") {
      shareImage()
    }
    .padding(.top, 40)
    ForEach(0..<3) { _ in
      Image(systemName: "heart")
        .resizable()
        .scaledToFit()
        .frame(width: 200, height: 300)
    }
    Image(systemName: "person")
      .resizable()
      .scaledToFit()
      .frame(width: 200, height: 300)
  }
}
```

\
The **`shareImage()`** function captures an image and attaches it to an **`UIActivityViewController`** and presents it.

```swift

private func shareImage() {
    guard let screenshotImage = scrollContent.snapshot() else { return }
    let activityController = UIActivityViewController(
        activityItems: [screenshotImage], applicationActivities: nil)
    let vc = UIApplication.shared.windows.first!.rootViewController
    vc?.present(activityController, animated: true)
}
```

In the code above, we capture an image by calling the **snapshot()** function on the **scrollContent** variable. To enable this, we declared **scrollContent** as a variable outside of the **body**.

Here is the **snapshot** function as a **UIView** extension:

```swift

extension View {
    func snapshot() -> UIImage? {
        let controller = UIHostingController(
            rootView: self.ignoresSafeArea().fixedSize(horizontal: true, vertical: true))
        guard let view = controller.view else { return nil }

        let targetSize = view.intrinsicContentSize // to capture entire scroll content
        if targetSize.width <= 0 || targetSize.height <= 0 { return nil }

        view.bounds = CGRect(origin: .zero, size: targetSize)
        view.backgroundColor = .systemTeal // set it to clear if no background color is preffered

        let renderer = UIGraphicsImageRenderer(size: targetSize)
        return renderer.image { rendereContext in
            view.drawHierarchy(in: controller.view.bounds, afterScreenUpdates: true)
        }
    }
}
```

\
<br>

### This is what happens:

- Insert the view that calls the function into a **`UIHostingController`**.
- Extract the **`UIView`** from the hosting controller.
- Set the bounds to the **`intrinsicContentSize`** to capture the entire content.
- Use **`UIGraphicsImageRenderer`** to generate a **`UIImage`** that can be shared.

\
\
<br>

## `Thanks for stopping by! 😸`

<!-- ## Step 1: Import Necessary Frameworks

First, ensure you have imported the necessary frameworks:

```swift
import SwiftUI
import UIKit
``` -->
